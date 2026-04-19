<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    protected $fillable = [
        'ip_address',
        'country',
        'city',
        'path',
        'device',
        'browser',
        'platform',
        'user_agent',
    ];
}
