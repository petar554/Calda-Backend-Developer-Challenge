import { createClient } from 'jsr:@supabase/supabase-js@2';

const supabaseUrl = Deno.env.get('SUPABASE_URL') as string; 
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Order {
    id?: string;
    user_id: string; 
    shipping_address: string; 
    recipient_name: string; 
    created_at?: string; 
    updated_at?: string; 
}

interface OrderItem {
    id?: string;
    order_id: string; 
    item_id: string; 
    quantity: number; 
    created_at?: string; 
    updated_at?: string;
}

interface RequestBody {
    order: Order & { items: OrderItem[] }; 
}

interface Prices {
    [key: string]: number; 
}

Deno.serve(async (req) => {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    let body: RequestBody;
    try {
        body = await req.json(); 
    } catch (err) {
        console.error("Error parsing JSON body:", err);
        return new Response("Invalid JSON body", { status: 400 });
    }

    if (!body.order || !Array.isArray(body.order.items) || !body.order.user_id || !body.order.shipping_address || !body.order.recipient_name) {
        return new Response("Invalid request body: missing required fields", { status: 400 });
    }

    const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([{
            user_id: body.order.user_id, 
            shipping_address: body.order.shipping_address,
            recipient_name: body.order.recipient_name,
        }])
        .single();

    if (orderError) {
        console.error("Error inserting order:", orderError.message);
        return new Response(JSON.stringify({ message: "Failed to insert order", error: orderError.message }), { status: 500 });
    }

    const items: OrderItem[] = body.order.items.map((item) => ({
        order_id: orderData.id,
        item_id: item.item_id,
        quantity: item.quantity,
    }));

    const { error: itemsError } = await supabase
        .from("order_items")
        .insert(items);

    if (itemsError) {
        console.error("Error inserting order items:", itemsError.message);
        return new Response(JSON.stringify({ message: "Failed to insert order items", error: itemsError.message }), { status: 500 });
    }

    const { data: orderItemsData, error: totalError } = await supabase
        .from("order_items")
        .select("quantity, item_id")
        .eq('order_id', orderData.id);

    if (totalError) {
        console.error("Error fetching order items for total:", totalError.message);
        return new Response(JSON.stringify({ message: "Failed to calculate order total", error: totalError.message }), { status: 500 });
    }

    const prices: Prices = {
        'item1Iid': 10,  
        'item2Iid': 20,
    };

    // calculation of all order totals inside the database
    const totalAmount = orderItemsData.reduce((acc: number, item: { item_id: string; quantity: number }) => {
        const price = prices[item.item_id] || 0;
        return acc + price * item.quantity;
    }, 0);

    return new Response(JSON.stringify({ order_id: orderData.id, total_amount: totalAmount }), {
        headers: { "Content-Type": "application/json" },
    });
});
