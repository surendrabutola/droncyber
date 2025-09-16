<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsTicker extends Model
{
    protected $fillable = [
        'type',
        'title',
        'news',
        'updated_by',
    ];
}
