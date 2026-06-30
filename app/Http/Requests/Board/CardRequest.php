<?php

namespace App\Http\Requests\Board;

use Illuminate\Foundation\Http\FormRequest;

class CardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return match ($this->method()) {
            'POST' => [
                'column_id' => 'required|integer',
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
                'priority' => 'required|string',
                'due_date' => 'nullable|string',
            ],
            'PATCH' => [
                'title' => 'sometimes|string|max:255',
                'description' => 'sometimes|nullable|string',
                'priority' => 'sometimes|string',
                'due_date' => 'sometimes|nullable|string',
            ],
            default => []
        };
    }
}
