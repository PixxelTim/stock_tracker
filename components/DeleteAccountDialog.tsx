'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { requestDeleteAccount } from "@/lib/actions/auth.actions";
import { toast } from "sonner";

interface DeleteAccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteAccountDialog({ open, onOpenChange }: DeleteAccountDialogProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteRequest = async () => {
        setIsLoading(true);
        try {
            const result = await requestDeleteAccount();
            
            if (result.success) {
                toast.success('Verification email sent', {
                    description: 'Please check your email to confirm account deletion.',
                });
                onOpenChange(false);
            } else {
                toast.error('Failed to send verification email', {
                    description: result.error || 'Please try again later.',
                });
            }
        } catch {
            toast.error('An error occurred', {
                description: 'Please try again later.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-gray-800 border-gray-700">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-red-500">
                        ⚠️ Delete Account
                    </DialogTitle>
                    <DialogDescription className="text-gray-300 pt-4">
                        This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="py-4 space-y-4">
                    <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4">
                        <p className="text-sm text-gray-300 font-semibold mb-2">
                            What will be deleted:
                        </p>
                        <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
                            <li>All your watchlists and tracked stocks</li>
                            <li>All your price and volume alerts</li>
                            <li>Your account settings and preferences</li>
                            <li>All personal data associated with your account</li>
                        </ul>
                    </div>
                    
                    <p className="text-sm text-gray-400">
                        We&apos;ll send you a verification email. You must click the link in the email to confirm the deletion.
                    </p>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                        className="text-gray-300 hover:text-gray-100"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleDeleteRequest}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isLoading ? 'Sending...' : 'Send Verification Email'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
