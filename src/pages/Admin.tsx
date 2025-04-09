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
import { Pencil, Trash2, Plus, SaveIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from '@/types/products';

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
  const { data: products = [], isLoading, error } = useQuery<Product[]>({
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
  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
  };

  const handleNewProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
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
      title: newProduct.title || '',
      image: newProduct.image || 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      price: newProduct.price || '0',
      unit: newProduct.unit || 'unit',
      description: newProduct.description || ''
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

  return (
    <motion.div
      className="container mx-auto py-20 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
        <Button onClick={handleAddNew} disabled={isAddingNew || !!editingProduct}>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      {isAddingNew && (
        <div className="mb-8 p-6 border rounded-lg shadow-sm bg-white">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input 
                name="title"
                value={newProduct.title || ''}
                onChange={handleNewProductChange}
                placeholder="Product title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <Input 
                name="image"
                value={newProduct.image || ''}
                onChange={handleNewProductChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <Input 
                name="price"
                value={newProduct.price || ''}
                onChange={handleNewProductChange}
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Unit</label>
              <Input 
                name="unit"
                value={newProduct.unit || ''}
                onChange={handleNewProductChange}
                placeholder="1 L, 500g, etc."
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Short Description</label>
            <Textarea 
              name="description"
              value={newProduct.description || ''}
              onChange={handleNewProductChange}
              placeholder="Brief description for product card"
              rows={2}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Description</label>
            <Textarea 
              name="full_description"
              value={newProduct.full_description || ''}
              onChange={handleNewProductChange}
              placeholder="Detailed product description"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Ingredients</label>
              <Textarea 
                name="ingredients"
                value={newProduct.ingredients || ''}
                onChange={handleNewProductChange}
                placeholder="Product ingredients"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Usage Instructions</label>
              <Textarea 
                name="usage_instructions"
                value={newProduct.usage_instructions || ''}
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
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <p>Loading products...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500">Error loading products. Please try again.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableCaption>Manage your product inventory</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product) => (
                <TableRow key={product.id}>
                  {editingProduct && editingProduct.id === product.id ? (
                    <>
                      <TableCell>{product.id.slice(0, 8)}...</TableCell>
                      <TableCell>
                        <Input 
                          name="image"
                          value={editingProduct.image}
                          onChange={handleEditChange}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          name="title"
                          value={editingProduct.title}
                          onChange={handleEditChange}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          name="price"
                          value={editingProduct.price}
                          onChange={handleEditChange}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Input 
                          name="unit"
                          value={editingProduct.unit}
                          onChange={handleEditChange}
                          className="w-full"
                        />
                      </TableCell>
                      <TableCell>
                        <Textarea 
                          name="description"
                          value={editingProduct.description}
                          onChange={handleEditChange}
                          className="w-full"
                          rows={2}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={handleSaveEdit}>
                            <SaveIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{product.id.slice(0, 8)}...</TableCell>
                      <TableCell>
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      </TableCell>
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
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );
};

export default Admin;