<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InfoCard extends Model
{
    protected $fillable = [
        'type',
        'title',
        'icon',
        'content',
        'className',
        'iconClassName',
        'updated_by',
    ];
}
