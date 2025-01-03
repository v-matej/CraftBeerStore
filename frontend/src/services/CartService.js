    import api from './api'

    const CartService = {
        getCartItems: async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await api.get('/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        addToCart: async (productId, quantity) => {
            const token = localStorage.getItem("token");
            const intQuantity = parseInt(quantity, 10);
            if (isNaN(intQuantity)) {
                throw new Error("Invalid quantity");
            }
            try {
                const response = await api.post('/cart', 
                    { productId, quantity: intQuantity },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        updateCartItem: async (productId, quantity) => {
            const token = localStorage.getItem("token");
            const intQuantity = parseInt(quantity, 10);
            if (isNaN(intQuantity)) {
                throw new Error("Invalid quantity");
            }
            try {
                const response = await api.put(`/cart/${productId}`,
                    { productId, quantity: intQuantity },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        removeFromCart: async (productId) => {
            const token = localStorage.getItem("token");
            try {
                const response = await api.delete(`${'/cart'}/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },

        clearCart: async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await api.delete('/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data;
            } catch (error) {
                throw error;
            }
        },
    }

    export default CartService;
