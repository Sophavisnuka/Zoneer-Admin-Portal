<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\AppUser;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index () {
        $properties = Property::query()
            ->select('id', 'address', 'price', 'property_status', 'verify_status')
            ->latest('id') // Use id instead of created_at since timestamps=false
            ->paginate(10)
            ->withQueryString();
        
        return Inertia::render('Property/Property', [
            'property' => $properties,
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
        $data = $request->validate([
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
        ]);

        $data['verify_status'] = 'default';
        $data['verified_by_admin'] = null;

        Property::create($data);

        return redirect()
            ->route('property')
            ->with('success', 'Property created successfully.');
    }

}
