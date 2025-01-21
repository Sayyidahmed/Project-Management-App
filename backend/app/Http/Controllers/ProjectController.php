<?php

namespace App\Http\Controllers;

use App\Models\project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the project info.
     */
    public function index()
    {
        return project::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
          "name"=> "string|required|max:255",
          "description"=>"required",
          "status"=> "required|string"
        ]);
        $project = project::create($data);
        return ['message'=>"Successfully Recorded New Project"];
    }

    /**
     * Display the specified resource.
     */
    public function show(project $project)
    {
        return $project;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, project $project)
    {
        $data = $request->validate([
            "name"=> "string|required|max:255",
            "description"=>"required",
            "status"=> "required|string"
          ]);
          $project->update($data);
          return ['message'=>"Successfully Updated the Project"];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(project $project)
    {
        $project->delete();
        return ['message'=>"Successfully Deleted"];
    }
}
