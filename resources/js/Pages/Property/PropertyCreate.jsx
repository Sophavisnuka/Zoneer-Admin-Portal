import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, Link, useForm, usePage } from "@inertiajs/react";

export default function PropertyCreate() {
  const { landlords } = usePage().props;

  const { data, setData, post, processing, errors } = useForm({
    landlord_id: "",
    address: "",
    price: "",
    bedroom: 0,
    bathroom: 0,
    square_area: "",
    location_url: "",
    description: "",
    property_status: "available",

    // JSON columns (keep as arrays for now)
    security_features: [],
    property_features: [],
    badge_options: [],
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("property.store"));
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create Property" />

      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Create Property</h1>
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

            <div className="pt-2 flex gap-2">
              <PrimaryButton disabled={processing}>
                {processing ? "Saving..." : "Create Property"}
              </PrimaryButton>
            </div>
          </form>
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

            <div className="pt-2 flex gap-2">
              <PrimaryButton disabled={processing}>
                {processing ? "Saving..." : "Create Property"}
              </PrimaryButton>
            </div>
          </form>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Note: security_features / property_features / badge_options are saved as empty arrays for now.
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
