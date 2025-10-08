import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function ShoppingList() {
  const navigate = useNavigate();
  const [shoppingLists, setShoppingLists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoadLists();
  }, []);

  const checkAuthAndLoadLists = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast.error("Please sign in to view shopping lists");
      navigate("/auth");
      return;
    }
    loadShoppingLists(user.id);
  };

  const loadShoppingLists = async (userId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("shopping_lists")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setShoppingLists(data || []);
    } catch (error: any) {
      console.error("Error loading shopping lists:", error);
      toast.error("Failed to load shopping lists");
    } finally {
      setLoading(false);
    }
  };

  const toggleItem = async (listId: string, itemIndex: number) => {
    const list = shoppingLists.find((l) => l.id === listId);
    if (!list) return;

    const updatedItems = [...list.items];
    updatedItems[itemIndex].checked = !updatedItems[itemIndex].checked;

    try {
      const { error } = await supabase
        .from("shopping_lists")
        .update({ items: updatedItems })
        .eq("id", listId);

      if (error) throw error;

      setShoppingLists(
        shoppingLists.map((l) => (l.id === listId ? { ...l, items: updatedItems } : l))
      );
    } catch (error: any) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item");
    }
  };

  const deleteList = async (listId: string) => {
    try {
      const { error } = await supabase.from("shopping_lists").delete().eq("id", listId);

      if (error) throw error;
      setShoppingLists(shoppingLists.filter((l) => l.id !== listId));
      toast.success("Shopping list deleted");
    } catch (error: any) {
      console.error("Error deleting list:", error);
      toast.error("Failed to delete list");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      <Navbar />

      <div className="container mx-auto py-12 px-4">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Shopping Lists</h1>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading shopping lists...</p>
          </div>
        ) : shoppingLists.length > 0 ? (
          <div className="grid gap-6 max-w-3xl">
            {shoppingLists.map((list) => (
              <Card key={list.id} className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{list.name}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteList(list.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {list.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-3">
                        <Checkbox
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(list.id, index)}
                        />
                        <span className={item.checked ? "line-through text-muted-foreground" : ""}>
                          {item.amount} {item.item}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg max-w-2xl mx-auto">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-2">No shopping lists yet</p>
            <p className="text-sm text-muted-foreground">
              Create shopping lists from your favorite recipes!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
