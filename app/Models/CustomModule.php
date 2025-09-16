<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomModule extends Model
{
    protected $fillable = [
        'name',
        'title',
        'detail',
        'form_fields', // Assuming this is a JSON or serialized field
    ];
    public function CustomModuleDetail()
    {
        return $this->hasMany(CustomModuleDetail::class, 'custom_module_id');
    }
}
