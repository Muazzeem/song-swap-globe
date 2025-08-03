import React, { useState } from 'react';
import { Check, Zap, Shield, Crown, Sparkles, Brain, Share2, Play, Star, CheckCircle, Award } from 'lucide-react';
import { Button } from './ui/button';
import { GlassCard } from './ui/glass-card';
import { useAuth } from '@/contexts/AuthContext';

const ToggleButton = ({ isYearly, onToggle }) => (
    <div className="flex items-center justify-center gap-3 p-1 bg-white/10 rounded-full backdrop-blur-sm">
        <button
            onClick={() => onToggle(false)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isYearly
                    ? 'bg-gradient-primary hover:shadow-glow transition-all text-white duration-300'
                    : 'text-white/70 hover:text-white'
                }`}
        >
            Monthly
        </button>
        <button
            onClick={() => onToggle(true)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative ${isYearly
                    ? 'bg-gradient-primary hover:shadow-glow transition-all text-white duration-300'
                    : 'text-white/70 hover:text-white'
                }`}
        >
            Yearly
            {isYearly && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Save 20%
                </span>
            )}
        </button>
    </div>
);

export default function PremiumSubscriptionCard() {
    const [isYearly, setIsYearly] = useState(false);
    const { user, logout, accessToken } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const features = [
        {
            icon: <Brain className="w-5 h-5 text-purple-400" />,
            title: "AI Fun Facts:",
            description: "Get a cool, educational fact for every song you receive."
        },
        {
            icon: <Share2 className="w-5 h-5 text-purple-400" />,
            title: "Share Cards:",
            description: "Post your received song cards to Instagram or Facebook Stories."
        },
        {
            icon: <Play className="w-5 h-5 text-purple-400" />,
            title: "30 Sends/Day:",
            description: "Swap up to 30 songs daily."
        },
        {
            icon: <Star className="w-5 h-5 text-purple-400" />,
            title: "Top Artist:",
            description: "See the most swapped artist of the day in Stats."
        },
        {
            icon: <CheckCircle className="w-5 h-5 text-purple-400" />,
            title: "Celebrity Mode:",
            description: "Get songs from verified artists & influencers."
        },
        {
            icon: <Award className="w-5 h-5 text-purple-400" />,
            title: "Premium badge on your profile.",
            description: ""
        }
    ];

    const pricing = {
        monthly: { price: 12.99, period: "month" },
        yearly: { price: 124.70, period: "year", originalPrice: 155.88 }
    };

    const currentPlan = isYearly ? pricing.yearly : pricing.monthly;
    const savings = isYearly ? pricing.yearly.originalPrice - pricing.yearly.price : 0;

    const handleSubscribe = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscriptions/init-subscription/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    type: isYearly ? 'yearly' : 'monthly',
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            window.open(result.payment_url, '_blank');
            setIsLoading(false)
        } catch (error) {
            console.error('Subscription failed:', error);
            setIsLoading(false)
        }
    };

    return (
        <div className="">
            <GlassCard className="border-primary/20 bg-gradient-to-br from-card/90 to-primary/5 p-6">
                <div className="text-center space-y-6">
                    <div className="text-5xl">⭐</div>

                    <h3 className="text-2xl font-bold text-white">Upgrade to Premium</h3>

                    {/* Toggle Button */}
                    <ToggleButton isYearly={isYearly} onToggle={setIsYearly} />

                    {/* Pricing Display */}
                    <div className="text-center py-4">
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-3xl font-bold text-white">${currentPlan.price}</span>
                            <span className="text-gray-300">/{currentPlan.period}</span>
                        </div>
                        {isYearly && (
                            <div className="mt-2 space-y-1">
                                <div className="text-sm text-gray-400 line-through">
                                    ${pricing.yearly.originalPrice}/year
                                </div>
                                <div className="text-green-400 text-sm font-medium">
                                    Save ${savings.toFixed(2)} per year
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-4 text-left">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                                {feature.icon}
                                <div className="flex-1">
                                    <span className="text-white font-medium">{feature.title}</span>
                                    {feature.description && (
                                        <span className="text-gray-300 ml-1">- {feature.description}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Subscribe Button */}
                    <Button onClick={handleSubscribe} disabled={isLoading}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 text-white font-semibold shadow-xl">
                        Subscribe {isYearly ? 'Yearly' : 'Monthly'}
                    </Button>

                    <p className="text-xs text-gray-400 mt-4">
                        Cancel anytime. No hidden fees.
                    </p>
                </div>
            </GlassCard>
        </div>
    );
}