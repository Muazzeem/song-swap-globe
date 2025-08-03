import React from 'react';
import { Calendar, Clock, CreditCard, User, CheckCircle, XCircle } from 'lucide-react';
import { GlassCard } from './ui/glass-card';



const SubscriptionInfo = () => {
    const defaultSubscription = {
        id: 'sub_1234567890abcdef',
        user: {
            name: 'John Doe',
            email: 'john.doe@example.com'
        },
        type: 'MONTHLY',
        start_date: '2024-01-15T10:30:00Z',
        end_date: '2024-02-15T10:30:00Z',
        subscription_id: 'stripe_sub_1NvQaT2eZvKYlo2C0Z3k4567',
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z',
        is_active: true
    };

    const data = defaultSubscription;

    // Helper functions
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getSubscriptionTypeLabel = (type) => {
        const types = {
            'MONTHLY': 'Monthly',
            'YEARLY': 'Yearly',
            'WEEKLY': 'Weekly',
            'LIFETIME': 'Lifetime'
        };
        return types[type] || type;
    };

    const isSubscriptionActive = () => {
        const now = new Date();
        const endDate = new Date(data.end_date);
        return endDate > now && data.is_active;
    };

    const getDaysRemaining = () => {
        const now = new Date();
        const endDate = new Date(data.end_date);
        const diffTime = endDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const getStatusColor = () => {
        return isSubscriptionActive() ? 'text-green-600' : 'text-red-600';
    };

    const getStatusBgColor = () => {
        return isSubscriptionActive() ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
    };

    return (
        <GlassCard className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gradient-primary">Subscription Details</h2>
                <div className={`flex items-center px-3 py-1 rounded-full border ${getStatusBgColor()}`}>
                    {isSubscriptionActive() ? (
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    ) : (
                        <XCircle className="w-4 h-4 mr-2 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${getStatusColor()}`}>
                        {isSubscriptionActive() ? 'Active' : 'Inactive'}
                    </span>
                </div>
            </div>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* User Info */}
                <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <User className="w-5 h-5 mr-2" />
                        <h3 className="font-semibold bg-gradient-primary bg-clip-text text-transparent">Subscriber</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{data.user.name}</p>
                    <p className="text-sm text-muted-foreground">{data.user.email}</p>
                </div>

                {/* Subscription Type */}
                <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <CreditCard className="w-5 h-5 mr-2" />
                        <h3 className="font-semibold bg-gradient-primary bg-clip-text text-transparent">Plan Type</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {getSubscriptionTypeLabel(data.type)}
                    </p>
                    <p className="text-sm text-muted-foreground">Subscription Plan</p>
                </div>
            </div>

            {/* Date Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 mr-2" />
                        <h3 className="font-semibold bg-gradient-primary bg-clip-text text-transparent">Start Date</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatDate(data.start_date)}</p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 mr-2" />
                        <h3 className="font-semibold bg-gradient-primary bg-clip-text text-transparent">End Date</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatDate(data.end_date)}</p>
                    {isSubscriptionActive() && (
                        <p className="text-orange-600 text-sm mt-1">
                            {getDaysRemaining()} days remaining
                        </p>
                    )}
                </div>
            </div>

            {/* Subscription ID */}
            <div className="bg-muted/50 p-4 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2 bg-gradient-primary bg-clip-text text-transparent">Subscription ID</h3>
                <p className="text-sm text-muted-foreground break-all">{data.subscription_id}</p>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                    <span className="font-medium">Created:</span> {formatDate(data.created_at)}
                </div>
                <div>
                    <span className="font-medium">Last Updated:</span> {formatDate(data.updated_at)}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6">
                {isSubscriptionActive() && (
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Cancel Subscription
                    </button>
                )}
            </div>
        </GlassCard>
    );
};

export default SubscriptionInfo;