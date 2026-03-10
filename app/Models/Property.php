<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;


class Property extends Model
{
    use HasUuids;
    protected $table = "properties";
    public $timestamps = false;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'price',
        'bedroom',
        'bathroom',
        'square_area',
        'address',
        'location_url',
        'description',
        'security_features',
        'property_features',
        'badge_options',
        'verify_status',
        'thumbnail_url',
        'property_status',
        'landlord_id',
        'verified_by_admin',
    ];
    protected $casts = [
        'security_features' => 'array',
        'property_features' => 'array',
        'badge_options' => 'array',
        'price' => 'decimal:2',
        'square_area' => 'decimal:2',
    ];
}
