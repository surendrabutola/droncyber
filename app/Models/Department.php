<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'name',
        'hindi_name',
        'description',
    ];

    public function sub_departments(): HasMany
    {
        return $this->hasMany(SubDepartment::class);
    }
}
