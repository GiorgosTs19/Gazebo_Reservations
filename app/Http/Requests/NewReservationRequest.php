<?php

namespace App\Http\Requests;

use App\Models\DisabledDay;
use App\Models\DisabledTable;
use App\Models\Reservation;
use Illuminate\Foundation\Http\FormRequest;

class NewReservationRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'date' => 'required|date',
            'table' => 'required|uuid',
            'type' => 'required|string|in:Dinner,Bed',
            'number_of_people' => 'required|numeric|min:1',
            'attendees' => 'required_if:number_of_people,>1|array_length:' . ($this->input('number_of_people') - 1),
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone_number' => 'required|numeric',
            'primary_room' => 'required|numeric|min_digits:3|max_digits:4',
            'secondary_room' => 'nullable|numeric|min_digits:3|max_digits:4',
            'notes' => 'nullable|string|max:250',
            'more_rooms' => 'required|boolean',
            'primary_menu' => 'required|array',
            'primary_menu.Main' => 'required_if:type,Dinner|uuid',
            'primary_menu.Dessert' => 'nullable|required_if:type,Dinner|uuid',
            'secondary_menu' => 'required|array',
            'secondary_menu.Main' => [
                'sometimes',
                'nullable',
                function ($attribute, $value, $fail) {
                    if ($this->input('type') === 'Dinner' && $this->input('more_rooms') === true) {
                        if (empty($value)) {
                            $fail("The $attribute field is required when type is Dinner and there is more than 1 rooms.");
                        }
                    }
                },
                'uuid'
            ],
            'secondary_menu.Dessert' => [
                'sometimes',
                'nullable',
                function ($attribute, $value, $fail) {
                    if ($this->input('type') === 'Dinner' && $this->input('more_rooms')=== true) {
                        if (empty($value)) {
                            $fail("The $attribute field is required when type is Dinner and there is more than 1 rooms.");
                        }
                    }
                },
                'uuid',
            ],
        ];

        if ($this->input('type') === 'Dinner') {
            $rules['number_of_people'] .= '|max:4';
        } elseif ($this->input('type') === 'Bed') {
            $rules['number_of_people'] .= '|max:2';
        }

        return $rules;
    }

    public function messages() {
        return [
            'date.required' => 'The date field is required.',
            'table.required' => 'The Gazebo field is required.',
            'type.required' => 'The type field is required.',
            'number_of_people.required' => 'The number of people field is required.',
            'number_of_people.numeric' => 'The number of people field must be a number.',
            'number_of_people.min' => 'The number of people must be at least 1.',
            'number_of_people.max' => 'The number of people field cannot exceed :max when type is :type.',
            'first_name.required' => 'The first name field is required.',
            'last_name.required' => 'The last name field is required.',
            'email.required' => 'The email field is required.',
            'email.email' => 'Please enter a valid email address.',
            'phone_number.required' => 'The phone number field is required.',
            'phone_number.numeric' => 'The phone number field must be a number.',
            'primary_room.required' => 'The primary room field is required.',
            'secondary_room.numeric' => 'The secondary room field must be a number.',
            'notes.max' => 'The notes field cannot exceed :max characters.',
            'more_rooms.required' => 'The more rooms field is required.',
            'primary_menu.Main.required_if' => 'The primary menu main dish selection is required.',
            'primary_menu.Dessert.required_if' => 'The primary menu dessert dish selection is required.',
            'secondary_menu.Main.required_if' => 'Main Dish for :secondary_room cannot be empty',
            'secondary_menu.Dessert.required_if' => 'Dessert for :secondary_room cannot be empty',
            'attendees.array_length' => 'The number of attendees must be equal to the number of guests minus 1.',
        ];
    }

    public function withValidator($validator) {
        $validator->after(function ($validator) {
            $validatedData = $this->validated();
            $Reservation_Exists = Reservation::date($validatedData['date'])->table($validatedData['table'])->type($validatedData['type'])->exists();
            $Date_Disabled_Reservations_Not_Allowed = DisabledDay::date($validatedData['date'])->allowReservations(false)->type($validatedData['type'])->exists();
            $Gazebo_Is_Disabled = DisabledTable::date($validatedData['date'])->type($validatedData['type'])->exists();
            if($Date_Disabled_Reservations_Not_Allowed) {
                $validator->errors()->add('day_disabled',
                    'It seems that the selected date is not available for booking anymore. Please select another date.');
            }
            if($Reservation_Exists || $Gazebo_Is_Disabled) {
                $validator->errors()->add('gazebo_occupied',
                    'It seems that the gazebo you are trying to book is not available on the selected date. Please select another gazebo or another date.');
            }
        });
    }
}
