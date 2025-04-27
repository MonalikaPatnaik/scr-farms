import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus, SaveIcon, X, Users, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/products';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  user_id: string;
  updated_at: string;
}

interface Profile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

const Admin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    title: '',
    image: '',
    price: '',
    unit: '',
    description: '',
    full_description: '',
    ingredients: '',
    usage_instructions: ''
  });

  // Fetch products
  const { data: products = [], isLoading: productsLoading, error: productsError } = useQuery<Product[]>({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Product[];
    },
  });

  // Fetch orders
  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Order[];
    },
  });

  // Fetch profiles
  const { data: profiles = [], isLoading: profilesLoading } = useQuery<Profile[]>({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data as Profile[];
    },
  });

  // Create product mutation
  const createProduct = useMutation({
    mutationFn: async (product: Partial<Product>) => {
      const { data, error } = await supabase
        .from('products')
        .insert([product])
        .select();
        
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product added",
        description: "The product has been added successfully."
      });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "There was a problem adding the product.",
        variant: "destructive"
      });
    }
  });

  // Update product mutation
  const updateProduct = useMutation({
    mutationFn: async (product: Product) => {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', product.id)
        .select();
        
      if (error) throw error;
      return data[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product'] });
      toast({
        title: "Product updated",
        description: "The product has been updated successfully."
      });
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "There was a problem updating the product.",
        variant: "destructive"
      });
    }
  });

  // Delete product mutation
  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast({
        title: "Product deleted",
        description: "The product has been removed successfully."
      });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "There was a problem deleting the product.",
        variant: "destructive"
      });
    }
  });

  // Edit a product
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsAddingNew(false);
  };

  // Update product in edit mode
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value
    });
  };

  // Save edited product
  const handleSaveEdit = () => {
    if (!editingProduct) return;
    
    updateProduct.mutate(editingProduct, {
      onSuccess: () => {
        setEditingProduct(null);
      }
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Delete a product
  const handleDelete = (id: string) => {
    // Add confirmation
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct.mutate(id);
    }
  };

  // Add new product form handlers
  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
    setNewProduct({
      title: '',
      image: '',
      price: '',
      unit: '',
      description: '',
      full_description: '',
      ingredients: '',
      usage_instructions: ''
    });
  };

  const handleSaveNew = () => {
    if (!newProduct.title || !newProduct.price || !newProduct.unit) {
      toast({
        title: "Missing information",
        description: "Please fill in at least the title, price, and unit fields.",
        variant: "destructive"
      });
      return;
    }

    const productToAdd = {
      ...newProduct,
      title: newProduct.title ?? '',
      image: newProduct.image ?? 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: newProduct.price ?? '0',
      unit: newProduct.unit ?? 'unit',
      description: newProduct.description ?? ''
    };
    
    createProduct.mutate(productToAdd, {
      onSuccess: () => {
        setIsAddingNew(false);
        setNewProduct({
          title: '',
          image: '',
          price: '',
          unit: '',
          description: '',
          full_description: '',
          ingredients: '',
          usage_instructions: ''
        });
      }
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl mt-9 font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="products">
        <TabsList className="mb-4 flex justify-center">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="profiles">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Products</h2>
              {!isAddingNew && (
                <Button onClick={() => {
                  setIsAddingNew(true);
                  setEditingProduct(null);
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Product
                </Button>
              )}
            </div>

            {isAddingNew && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 border rounded-lg"
              >
                <h3 className="text-lg font-medium mb-4">Add New Product</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="new-title" className="block text-sm font-medium mb-1">Title</label>
                    <Input 
                      id="new-title"
                      name="title"
                      value={newProduct.title ?? ''}
                      onChange={handleNewProductChange}
                      placeholder="Product title"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-image" className="block text-sm font-medium mb-1">Image URL</label>
                    <Input 
                      id="new-image"
                      name="image"
                      value={newProduct.image ?? ''}
                      onChange={handleNewProductChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-price" className="block text-sm font-medium mb-1">Price</label>
                    <Input 
                      id="new-price"
                      name="price"
                      value={newProduct.price ?? ''}
                      onChange={handleNewProductChange}
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-unit" className="block text-sm font-medium mb-1">Unit</label>
                    <Input 
                      id="new-unit"
                      name="unit"
                      value={newProduct.unit ?? ''}
                      onChange={handleNewProductChange}
                      placeholder="1 L, 500g, etc."
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="new-description" className="block text-sm font-medium mb-1">Short Description</label>
                  <Textarea 
                    id="new-description"
                    name="description"
                    value={newProduct.description ?? ''}
                    onChange={handleNewProductChange}
                    placeholder="Brief description for product card"
                    rows={2}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="new-full-description" className="block text-sm font-medium mb-1">Full Description</label>
                  <Textarea 
                    id="new-full-description"
                    name="full_description"
                    value={newProduct.full_description ?? ''}
                    onChange={handleNewProductChange}
                    placeholder="Detailed product description"
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="new-ingredients" className="block text-sm font-medium mb-1">Ingredients</label>
                    <Textarea 
                      id="new-ingredients"
                      name="ingredients"
                      value={newProduct.ingredients ?? ''}
                      onChange={handleNewProductChange}
                      placeholder="Product ingredients"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="new-usage-instructions" className="block text-sm font-medium mb-1">Usage Instructions</label>
                    <Textarea 
                      id="new-usage-instructions"
                      name="usage_instructions"
                      value={newProduct.usage_instructions ?? ''}
                      onChange={handleNewProductChange}
                      placeholder="How to use the product"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancelNew}>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                  <Button onClick={handleSaveNew}>
                    <SaveIcon className="mr-2 h-4 w-4" /> Save Product
                  </Button>
                </div>
              </motion.div>
            )}

            {editingProduct && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 border rounded-lg"
              >
                <h3 className="text-lg font-medium mb-4">Edit Product</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="edit-title" className="block text-sm font-medium mb-1">Title</label>
                    <Input 
                      id="edit-title"
                      name="title"
                      value={editingProduct.title}
                      onChange={handleEditChange}
                      placeholder="Product title"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-image" className="block text-sm font-medium mb-1">Image URL</label>
                    <Input 
                      id="edit-image"
                      name="image"
                      value={editingProduct.image}
                      onChange={handleEditChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-price" className="block text-sm font-medium mb-1">Price</label>
                    <Input 
                      id="edit-price"
                      name="price"
                      value={editingProduct.price}
                      onChange={handleEditChange}
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-unit" className="block text-sm font-medium mb-1">Unit</label>
                    <Input 
                      id="edit-unit"
                      name="unit"
                      value={editingProduct.unit}
                      onChange={handleEditChange}
                      placeholder="1 L, 500g, etc."
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="edit-description" className="block text-sm font-medium mb-1">Short Description</label>
                  <Textarea 
                    id="edit-description"
                    name="description"
                    value={editingProduct.description}
                    onChange={handleEditChange}
                    placeholder="Brief description for product card"
                    rows={2}
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="edit-full-description" className="block text-sm font-medium mb-1">Full Description</label>
                  <Textarea 
                    id="edit-full-description"
                    name="full_description"
                    value={editingProduct.full_description}
                    onChange={handleEditChange}
                    placeholder="Detailed product description"
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="edit-ingredients" className="block text-sm font-medium mb-1">Ingredients</label>
                    <Textarea 
                      id="edit-ingredients"
                      name="ingredients"
                      value={editingProduct.ingredients}
                      onChange={handleEditChange}
                      placeholder="Product ingredients"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-usage-instructions" className="block text-sm font-medium mb-1">Usage Instructions</label>
                    <Textarea 
                      id="edit-usage-instructions"
                      name="usage_instructions"
                      value={editingProduct.usage_instructions}
                      onChange={handleEditChange}
                      placeholder="How to use the product"
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    <X className="mr-2 h-4 w-4" /> Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>
                    <SaveIcon className="mr-2 h-4 w-4" /> Save Product
                  </Button>
                </div>
              </motion.div>
            )}

            {productsLoading ? (
              <div>Loading products...</div>
            ) : productsError ? (
              <div>Error loading products</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>{product.unit}</TableCell>
                      <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEdit(product)}
                            disabled={!!editingProduct || isAddingNew}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDelete(product.id)}
                            disabled={!!editingProduct || isAddingNew}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <ShoppingBag className="w-6 h-6 mr-2" />
                Orders
              </h2>
            </div>

            {ordersLoading ? (
              <div>Loading orders...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>User ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.user_id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>

        <TabsContent value="profiles">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <Users className="w-6 h-6 mr-2" />
                User Profiles
              </h2>
            </div>

            {profilesLoading ? (
              <div>Loading profiles...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User ID</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {profiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell>{profile.id}</TableCell>
                      <TableCell>{profile.email}</TableCell>
                      <TableCell>{new Date(profile.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(profile.updated_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;