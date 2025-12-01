import api from './api';

// --- Dashboard ---
export const getDashboardData = async () => {
    try {
        const response = await api.get('/admin/dashboard/executive');
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return {
            totalRevenue: 0,
            totalOrders: 0,
            totalCustomers: 0,
            averageTicket: 0,
            revenueChart: [],
            recentOrders: []
        };
    }
};

// --- Products ---
export const getProducts = async () => {
    const response = await api.get('/products');
    return response.data;
};

export const getProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};

// --- Orders ---
export const getOrders = async () => {
    const response = await api.get('/orders');
    return response.data;
};

export const getOrderById = async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
};

// --- Customers (Users) ---
export const getCustomers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const getCustomerById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

// --- Settings ---
export const getSettings = async () => {
    try {
        const response = await api.get('/admin/configs');
        return response.data;
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return null;
    }
};

export const updateSettings = async (section, data) => {
    const response = await api.put('/admin/configs', { section, data });
    return response.data;
};

// --- Shipping Rules ---
export const getShippingRules = async () => {
    const response = await api.get('/admin/shipping-rules');
    return response.data;
};

export const createShippingRule = async (data) => {
    const response = await api.post('/admin/shipping-rules', data);
    return response.data;
};

export const updateShippingRule = async (id, data) => {
    const response = await api.put(`/admin/shipping-rules/${id}`, data);
    return response.data;
};

export const deleteShippingRule = async (id) => {
    const response = await api.delete(`/admin/shipping-rules/${id}`);
    return response.data;
};

// --- Coupons ---
export const getCoupons = async () => {
    const response = await api.get('/coupons');
    return response.data;
};

export const createCoupon = async (data) => {
    const response = await api.post('/coupons', data);
    return response.data;
};

// Note: Update and GetById for coupons are not explicitly defined in the provided routes file,
// but adding them here as placeholders in case the API supports them or they are added later.
// If they fail, it means the endpoint is missing.
export const getCouponById = async (id) => {
    // Assuming standard REST pattern if it exists
    const response = await api.get(`/coupons/${id}`);
    return response.data;
};

export const updateCoupon = async (id, data) => {
    // Assuming standard REST pattern if it exists
    const response = await api.put(`/coupons/${id}`, data);
    return response.data;
};
