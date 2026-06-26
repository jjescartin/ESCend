<?php

namespace App\Http\Requests\Board;

use Illuminate\Foundation\Http\FormRequest;

class ColumnRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'color' => 'nullable|string'
        ];
    }
}