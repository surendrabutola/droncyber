<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CicoUser extends Model
{
    protected $fillable = [
        'first_name',
        'last_name',
        'full_name',
        'email',
        'phone',
        'designation',
        'department',
        'organization',
        'appointment_order',
        'is_approved',
        'remark',
    ];

    public function departments(): BelongsTo
    {
        return $this->belongsTo(Department::class, 'department', 'id');
    }

    public function subDepartment(): BelongsTo
    {
        return $this->belongsTo(SubDepartment::class, 'organization', 'id');
    }
}
