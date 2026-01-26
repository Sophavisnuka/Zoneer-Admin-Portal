<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AppUser extends Model
{
    protected $table = "users";
    public $timestamps = false;
    protected $fillable = [];
    protected $keyType = 'string';
    public $incrementing = false;
}
