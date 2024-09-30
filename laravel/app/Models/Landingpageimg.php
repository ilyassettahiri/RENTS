<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Landingpageimg extends Model
{


    protected $fillable = ['landingpage_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function landingpageimg(): BelongsTo {

        return $this->belongsTo(Landingpageimg::class);

    }


}
