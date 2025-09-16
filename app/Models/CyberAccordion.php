<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CyberAccordion extends Model
{
     protected $fillable = [
        'type',
        'title',
        'severity',
        'description',
        'updated_by',
    ];
}
