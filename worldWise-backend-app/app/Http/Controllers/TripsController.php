<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Trip;

class TripsController
{

  //function that add a new trip
  public function addTrip(Request $request) {
    //\Log::info('#request : ' . $request);
    try {
      $validated = $request->validate([
        'user_id'=> 'required',
        'wikipediaId'=> 'min:0',
        'description'=> 'min:0',
        'date'=> 'required',
        'countryFlag'=> 'required',
        'countryName'=> 'required',
        'cityName'=> 'required',
        'lat'=> 'required',
        'lng'=> 'required'
      ]);

      $trip = Trip::create($validated);

      return response()->json([
        "message" => "trip added successfully!",
        "trip" => $validated
      ]);

    }catch(ValidationException $e){
      //\Log::info('#Error : ' . $e);
      return response()->json([
        "message" => "validation error",
        'error' => $e
      ],422);

    }catch(\Exception $e) {
      //\Log::info('#Error : ' . $e);
      return response()->json([
        "message" => "Oop! Something just went wrong! Try later..",
        'error' => $e
      ],500);
    };

  }

  //function that retrieve and return all the user's trips
  public function getTrips($user_id) {
    //\Log::info('#user_Id : ' . $user_id);
    $trips = Trip::where('user_id',$user_id)->get();
    //\Log::info('#trips : ' . $trips);

    return response()->json([
      'trips' => $trips,
      'message' => 'data fetched successfully'
    ],200);
  }

  // function that delete a user's trip record
  public function deleteTrip(Request $request) {
    $trip = Trip::find($request->id);
    if ($trip) {
      if ($trip->user_id === $request->user_id) {
        $trip->delete();
        return response()->json([
          'message' => 'trip got removed successfully '
        ],200);
      };
    };
    return response()->json([
      'message' => 'Oops! something went wrong!'
    ],403);
  }

  // function that modify a user's trip record
  public function modifyTrip(Request $request) {

    try {
      $validated = $request->validate([
        'id' => 'required',
        'user_id'=> 'required',
        'wikipediaId'=> 'min:0',
        'description'=> 'min:0',
        'date'=> 'required',
        'countryFlag'=> 'required',
        'countryName'=> 'required',
        'cityName'=> 'required',
        'lat'=> 'required',
        'lng'=> 'required'
      ]);

      $trip = Trip::find($validated['id']);

      if ($trip) {
        if($trip->user_id === $validated['user_id']) {
          $trip->fill(collect($validated)->except('id')->toArray());
          $trip->save();
          return response()->json([
            'message' => 'Trip updated successfully!'
          ],200);
        };
      };


    }catch(ValidationException $e) {
      // \Log::info('#Validation_Error : ' . $e);
      return response()->json([
        'message' => 'validation error!',
        'error' => $e->getMessage()
      ],422);
    }catch (\Exception $e) {
      // \Log::info('#Exception_Error : ' . $e);
      return response()->json([
        'message' => 'Oops! Something just went wrong.. Try Later',
        'error' => $e->getMessage()
      ],200);
    };

  }

}


 ?>
