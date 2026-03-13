import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

export default function PropertyEdit() {
  const { landlords, property } = usePage().props;
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { data, setData, transform, patch, delete: destroy, processing, errors } = useForm({
    landlord_id: property.landlord_id,
    address: property.address,
    price: property.price,
    bedroom: property.bedroom,
    bathroom: property.bathroom,
    square_area: property.square_area,
    location_url: property.location_url,
    description: property.description,
    thumbnail_url: property.thumbnail_url,
    images: [],
    property_status: property.property_status,
    verify_status: property.verify_status ?? 'verified',

    // JSON columns (keep as arrays for now)
    security_features: [],
    property_features: [],
    badge_options: [],
  });

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this property?")) {
      return;
    }

    destroy(route("property.destroy", property.id), {
      onSuccess: () => {
        toast.success("Property deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete property!");
      }
    });
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setThumbnailFile(acceptedFiles[0]);
    }
  });

  const { getRootProps: getRootPropsMultiple, getInputProps: getInputPropsMultiple, isDragActive: isDragActiveMultiple } = useDropzone({
    accept: { 'image/*': [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      setAdditionalFiles(acceptedFiles);
    }
  });

  const uploadImage = async (file, path) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabase.storage.from('properties_image').upload(filePath, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage.from('properties_image').getPublicUrl(filePath);

    return publicUrl;
  }

  const removeImage = (indexToRemove) => {
    setAdditionalFiles(additionalFiles.filter((_, index) => index !== indexToRemove));
  }

  const submit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      toast.loading('Uploading images...', { id: 'upload' });
      
      let thumbnailUrl = data.thumbnail_url;
      if (thumbnailFile && thumbnailFile !== data.thumbnail_url) {
        thumbnailUrl = await uploadImage(thumbnailFile, 'thumbnails');
      }

      const imageUrls = [];
      if (additionalFiles.length > 0) {
        for (const file of additionalFiles) {
          const url = await uploadImage(file, 'properties');
          imageUrls.push(url);
        }
      }

      toast.loading('Saving property...', { id: 'upload' });

      transform((currentData) => ({
        ...currentData,
        thumbnail_url: thumbnailUrl,
        images: imageUrls,
      }));

      patch(route("property.update", property.id), {
        onSuccess: () => {
          toast.success('Property updated successfully!', { id: 'upload' });
          setUploading(false);
        },
        onError: (formErrors) => {
          const firstError = Object.values(formErrors)[0];
          toast.error(firstError || 'Failed to update property!', { id: 'upload' });
          setUploading(false);
        }
      });
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
    }
  };

  useEffect(() => {
    setThumbnailFile(property.thumbnail_url);
    return () => {
      additionalFiles.forEach(file => URL.revokeObjectURL(file.preview));
    };
  }, []);

  return (
    <AuthenticatedLayout>
      <Head title="Edit Property" />

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Edit Property</h1>
          <Link href={route("property")} className="text-sm text-gray-600 hover:underline">
            Back to list
          </Link>
        </div>
        <div className="flex justify-between gap-5">

          <form onSubmit={submit} className="flex flex-col flex-1 rounded-xl border bg-white p-5 space-y-4">
            {/* Landlord */}
            <div>
              <label className="block text-sm font-medium mb-1">Landlord</label>
              <select
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={data.landlord_id}
                onChange={(e) => setData("landlord_id", e.target.value)}
              >
                <option value="">Select landlord...</option>
                {landlords?.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.fullname}
                  </option>
                ))}
              </select>
              {errors.landlord_id && <div className="mt-1 text-sm text-red-600">{errors.landlord_id}</div>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
              />
              {errors.address && <div className="mt-1 text-sm text-red-600">{errors.address}</div>}
            </div>

            {/* Price + Square */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={data.price}
                  onChange={(e) => setData("price", e.target.value)}
                />
                {errors.price && <div className="mt-1 text-sm text-red-600">{errors.price}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Square area</label>
                <input
                  type="number"
                  step="0.01"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={data.square_area}
                  onChange={(e) => setData("square_area", e.target.value)}
                />
                {errors.square_area && <div className="mt-1 text-sm text-red-600">{errors.square_area}</div>}
              </div>
            </div>

            {/* Bed + Bath */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Bedroom</label>
                <input
                  type="number"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={data.bedroom}
                  onChange={(e) => setData("bedroom", Number(e.target.value))}
                />
                {errors.bedroom && <div className="mt-1 text-sm text-red-600">{errors.bedroom}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bathroom</label>
                <input
                  type="number"
                  className="w-full rounded-lg border px-3 py-2 text-sm"
                  value={data.bathroom}
                  onChange={(e) => setData("bathroom", Number(e.target.value))}
                />
                {errors.bathroom && <div className="mt-1 text-sm text-red-600">{errors.bathroom}</div>}
              </div>
            </div>

            {/* Location URL */}
            <div>
              <label className="block text-sm font-medium mb-1">Location URL</label>
              <input
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={data.location_url}
                onChange={(e) => setData("location_url", e.target.value)}
              />
              {errors.location_url && <div className="mt-1 text-sm text-red-600">{errors.location_url}</div>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1">Property status</label>
              <select
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={data.property_status}
                onChange={(e) => setData("property_status", e.target.value)}
              >
                <option value="available">Available</option>
                <option value="rented">Rented</option>
              </select>
              {errors.property_status && (
                <div className="mt-1 text-sm text-red-600">{errors.property_status}</div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                rows={4}
                className="w-full rounded-lg border px-3 py-2 text-sm"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
              {errors.description && <div className="mt-1 text-sm text-red-600">{errors.description}</div>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Verify status</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setData("verify_status", "pending")}
                  className={
                    "rounded-md border px-3 py-2 text-sm " +
                    (data.verify_status === "pending"
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "bg-white text-gray-700")
                  }
                >
                  Set Pending
                </button>

                <button
                  type="button"
                  onClick={() => setData("verify_status", "verified")}
                  className={
                    "rounded-md border px-3 py-2 text-sm " +
                    (data.verify_status === "verified"
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700")
                  }
                >
                  Set Verified
                </button>
              </div>

              {errors.verify_status && (
                <div className="mt-1 text-sm text-red-600">{errors.verify_status}</div>
              )}
            </div>

            <div className="pt-2 flex gap-2">
              <PrimaryButton disabled={processing}>
                {processing ? "Saving..." : "Edit Property"}
              </PrimaryButton>

              <button
                type="button"
                onClick={handleDelete}
                disabled={processing}
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
              >
                Delete Property
              </button>
            </div>
          </form>

          <div>
            <label htmlFor="block text-sm font-medium mb-1">Property's Thumbnail</label>
            <div {...getRootProps()} className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-red-500" >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the image here...</p>
              ) : (
                <p>Drag & drop thumbnail, or click to select</p>
              )}
              {thumbnailFile && (
                <div className="relative w-64">
                  {(typeof(thumbnailFile) === 'string') ? 
                  (<img src={thumbnailFile} alt="Preview" />) 
                  : (<img src={URL.createObjectURL(thumbnailFile)} className="" alt="Preview" />)}
                  <button onClick={(e) => {
                          e.stopPropagation();
                          setThumbnailFile(null);
                        }} className="absolute -top-2 -right-2 bg-black bg-opacity-70 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-opacity-100 cursor-pointer transition-all">
                          x
                        </button>
                </div>
              )}
            </div>

            <label htmlFor="block text-sm font-medium mb-1">Property's Images</label>
            <div {...getRootPropsMultiple()} className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-red-500" >
              <input {...getInputPropsMultiple()} />
              {isDragActive ? (
                <p>Drop the images here...</p>
              ) : (
                <p>Drag & drop images, or click to select</p>
              )}
              {
                additionalFiles.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {additionalFiles.map((file, index) => (
                      <div key={index} className="relative">
                        <img src={URL.createObjectURL(file)} className="w-64" alt={`Preview ${index}`} />
                        <button onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }} className="absolute -top-2 -right-2 bg-black bg-opacity-70 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-opacity-100 cursor-pointer transition-all">
                          x
                        </button>
                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          Note: security_features / property_features / badge_options are saved as empty arrays for now.
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
