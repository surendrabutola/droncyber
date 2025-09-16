<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomModuleDetail extends Model
{
    protected $fillable = [
        'custom_module_id',
        'name',
        'designation',
        'email',
        'status',
        'publish',
        'detail',
        'image',
    ];
}
