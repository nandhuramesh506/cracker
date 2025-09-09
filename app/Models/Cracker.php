<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cracker extends Model
{
    use HasFactory;

    protected $table = 'price_list'; // Ensure this matches your table name

    protected $fillable = [
        'category_id',
        'category_name',
        'cracker_name',
        'cracker_img',
        'cracker_oldPrice',
        'cracker_newPrice',
        'cracker_type',
    ];
}
