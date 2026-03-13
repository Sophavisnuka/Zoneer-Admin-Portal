<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\AppUser;
use App\Models\Image;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index (Request $request) {
        $properties = Property::query()
            ->select('id', 'address', 'price', 'property_status', 'verify_status')
            ->when($request->query('status'), fn($q, $s) => $q->where('verify_status', $s))
            ->latest('id') // Use id instead of created_at since timestamps=false
            ->paginate(10)
            ->withQueryString();
        
        return Inertia::render('Property/Property', [
            'property' => $properties,
            'filters' => ['status' => $request->query('status')],
        ]);
    }
    public function create()
    {
        $landlords = AppUser::query()
            ->where('role', 'landlord')
            ->select('id', 'fullname')
            ->orderBy('fullname')
            ->get();

        return Inertia::render('Property/PropertyCreate', [
            'landlords' => $landlords,
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'price' => ['required', 'numeric', 'min:0'],
            'bedroom' => ['required', 'integer', 'min:0'],
            'bathroom' => ['required', 'integer', 'min:0'],
            'square_area' => ['required', 'numeric', 'min:0'],

            'address' => ['required', 'string', 'max:255'],
            'location_url' => ['nullable', 'string', 'max:500'],
            'description' => ['nullable', 'string'],

            'thumbnail_url' => ['required', 'string'],

            'property_status' => ['required', 'in:rented,available'],
            'landlord_id' => ['required', 'uuid'],

            'security_features' => ['nullable', 'array'],
            'property_features' => ['nullable', 'array'],
            'badge_options' => ['nullable', 'array'],
            
            'images' => ['nullable', 'array'],
            'images.*' => ['string', 'max:500'],
        ]);

        $validated['verify_status'] = 'verified';
        $validated['verified_by_admin'] = null;

        $property = Property::create($validated);

        // Create image records
        if (!empty($validated['images'])) {
            foreach ($validated['images'] as $imageUrl) {
                Image::create([
                    'property_id' => $property->id,
                    'url' => $imageUrl,
                ]);
            }
        }

        return redirect()
            ->route('property')
            ->with('success', 'Property created successfully.');
    }

    public function edit(Property $property) {
        $landlords = AppUser::query()
            ->where('role', 'landlord')
            ->select('id', 'fullname')
            ->orderBy('fullname')
            ->get();

        return Inertia::render('Property/PropertyEdit', [
            'property' => $property,
            'landlords' => $landlords
        ]);
    }

    public function update(Request $request, Property $property) {
        $validated = $request->validate([
            'price'            => ['required', 'numeric', 'min:0'],
            'bedroom'          => ['required', 'integer', 'min:0'],
            'bathroom'         => ['required', 'integer', 'min:0'],
            'square_area'      => ['required', 'numeric', 'min:0'],
            'address'          => ['required', 'string', 'max:255'],
            'location_url'     => ['nullable', 'string', 'max:500'],
            'description'      => ['nullable', 'string'],
            'thumbnail_url'    => ['required', 'string'],
            'property_status'  => ['required', 'in:rented,available'],
            'landlord_id'      => ['required', 'uuid'],
            'verify_status'    => ['required', 'in:pending,verified'],
            'security_features'=> ['nullable', 'array'],
            'property_features'=> ['nullable', 'array'],
            'badge_options'    => ['nullable', 'array'],
        ]);

        $validated['verified_by_admin'] = $validated['verify_status'] === 'verified'
        ? $request->user()?->id
        : null;

        $property->update($validated);

        return redirect()->route('property')->with('success', 'Property updated successfully');
    }

    public function destroy(Property $property)
    {
        // TODO: Delete images from table first.
        $property->delete();

        return redirect()->route('property')->with('success', 'Property deleted successfully.');
    }
}
