<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubDepartment extends Model
{
    use SoftDeletes;
    protected $fillable = [
        'department_id',
        'name',
        'hindi_name',
        'description',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function ciso_user()
    {
        return $this->has(SubDepartment::class);
    }

    public function users()
    {
        return $this->hasMany(CicoUser::class, 'organization', 'id');
    }

}
