<?php

namespace App\Http\Requests\Board;

use Illuminate\Foundation\Http\FormRequest;

class BoardFormRequest extends FormRequest 
{

    public function authorze(): bool
    {
        return true;
    }

    public function rules()
    {
        return match($this->method()) {
            'POST' => [
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'end_date' => 'nullable|date',
            ],
            'PUT', 'PATCH' => [
                'name' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'end_date' => 'nullable|date',
            ],
            default => []
        };
    }
}