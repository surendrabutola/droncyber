<?php

namespace Database\Seeders;

use App\Models\CustomModule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        CustomModule::truncate();
        $pages = [
            [
                "name" => "events",
                "title" => "Ongoing Events",
                "detail" => " ",
                "form_fields" => json_encode(['name', 'status']),
            ],
            [
                "name" => "trainings",
                "title" => "Upcoming Trainings",
                "detail" => " ",
                "form_fields" => json_encode(['name', 'status']),
            ],
            [
                "name" => "leadership",
                "title" => "Leadership Messages",
                "detail" => " ",
                "form_fields" => json_encode(['name', 'designation', 'detail', 'image']),
            ],
            [
                "name" => "whos-who",
                "title" => "Who’s Who",
                "detail" => "",
                "form_fields" => json_encode(['name', 'email', 'designation', 'image']),
            ],
            
            [
                "name" => "archives",
                "title" => "Archives",
                "detail" => "",
                "form_fields" => json_encode(['name', 'status']),
            ],
            [
                "name" => "gallery",
                "title" => "Photo & Media Gallery",
                "detail" => "",
                "form_fields" => json_encode(['name', 'detail', 'image']),
            ],
            [
                "name" => "notification",
                "title" => "Latest Notifications",
                "detail" => "",
                "form_fields" => json_encode(['name', 'status']),
            ],
            [
                "name" => "alerts",
                "title" => " Alerts",
                "detail" => "",
                "form_fields" => json_encode(['name', 'status']),
            ],
            [
                "name" => "releases",
                "title" => "New Releases",
                "detail" => "",
                "form_fields" => json_encode(['name', 'status']),
            ],
            [
                "name" => "team",
                "title" => "Meet the Droncyber Team",
                "detail" => "Our team brings together skilled trainers, IT experts, and support staff dedicated to providing quality computer education, reliable cyber café services, and seamless government certificate assistance.",
                "form_fields" => json_encode(['name', 'designation', 'detail', 'image']),
            ],
        ];
        CustomModule::insert($pages);
    }
}
