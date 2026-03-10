<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model {
    protected $table = "images";
    public $timestamps = false;

    protected $fillable = [
        'property_id',
        'url'
    ];

    public function property() {
        return $this->belongsTo(Property::class);
    }
}