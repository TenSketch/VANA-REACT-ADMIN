import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ResortDetailData {
  id?: string;
  resortName: string;
  slug: string;
  contactPersonName: string;
  contactNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  cityDistrict: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  logo?: string | null;
  website: string;
  termsAndConditions: string;
  upiId: string;
  qrFile?: string | null;
  foodProviding: string;
  foodDetails: string;
  roomIdPrefix: string;
  extraGuestCharges: string;
  supportNumber: string;
  imageUrl?: string;
}

interface ResortDetailPanelProps {
  resort: ResortDetailData;
  isOpen: boolean;
  onClose: () => void;
}

const ResortDetailPanel = ({ resort, isOpen, onClose }: ResortDetailPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={onClose} />
      {/* Panel */}
      <div className="w-1/2 bg-white shadow-xl overflow-y-auto border-l border-slate-200">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">Resort Details</h2>
              <p className="text-slate-600">View resort information</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Form Fields - Read Only */}
          <div className="space-y-6">
            {/* Basic Information */}
            <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3 mb-6">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Resort Name</Label>
                <Input
                  value={resort.resortName}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Slug</Label>
                <Input
                  value={resort.slug}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Contact Person Name</Label>
                <Input
                  value={resort.contactPersonName}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Contact Number</Label>
                <Input
                  value={resort.contactNumber}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Email</Label>
                <Input
                  value={resort.email}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Website</Label>
                <Input
                  value={resort.website}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Support Number</Label>
                <Input
                  value={resort.supportNumber}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Room ID Prefix</Label>
                <Input
                  value={resort.roomIdPrefix}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Resort Logo</Label>
                {resort.logo ? (
                  <div className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50">
                    <img 
                      src={resort.logo} 
                      alt="Resort Logo" 
                      className="max-w-32 max-h-32 object-contain mx-auto"
                    />
                  </div>
                ) : (
                  <div className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 text-center">
                    No logo uploaded
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3 mb-6">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Address Line 1</Label>
                <Input
                  value={resort.addressLine1}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Address Line 2</Label>
                <Input
                  value={resort.addressLine2}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">City / District</Label>
                <Input
                  value={resort.cityDistrict}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">State / Province</Label>
                <Input
                  value={resort.stateProvince}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Postal Code</Label>
                <Input
                  value={resort.postalCode}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Country</Label>
                <Input
                  value={resort.country}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
            </div>

            {/* Food Information */}
            <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3 mb-6">Food Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Food Providing</Label>
                <Input
                  value={resort.foodProviding}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Extra Guest Charges</Label>
                <Input
                  value={resort.extraGuestCharges}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Food Details</Label>
                <Textarea
                  value={resort.foodDetails}
                  readOnly
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 resize-none"
                />
              </div>
            </div>

            {/* Payment Information */}
            <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3 mb-6">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">UPI ID</Label>
                <Input
                  value={resort.upiId}
                  readOnly
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">QR Code</Label>
                {resort.qrFile ? (
                  <div className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50">
                    <img 
                      src={resort.qrFile} 
                      alt="QR Code" 
                      className="max-w-32 max-h-32 object-contain mx-auto"
                    />
                  </div>
                ) : (
                  <div className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-500 text-center">
                    No QR code uploaded
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <h3 className="text-xl font-semibold text-slate-800 border-b border-slate-200 pb-3 mb-6">Terms & Conditions</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">Terms and Conditions</Label>
                <Textarea
                  value={resort.termsAndConditions}
                  readOnly
                  rows={5}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResortDetailPanel;
