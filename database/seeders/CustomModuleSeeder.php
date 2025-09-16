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
                "name" => "advisories",
                "title" => "Ongoing Advisories",
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
                "name" => "calendar",
                "title" => "Event's Calendar",
                "detail" => "",
                "form_fields" => json_encode(['name', 'status']),
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
                "title" => "Security Alerts",
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
                "name" => "bulletins",
                "title" => "Scheduled System Maintenance / Technical Bulletins",
                "detail" => "",
                "form_fields" => json_encode(['name', 'status']),
            ],
            [
                "name" => "team",
                "title" => "Meet the CERT UK Team",
                "detail" => "Our team comprises cybersecurity professionals, incident response experts, forensic analysts, and IT auditors working together to defend the state’s digital landscape.",
                "form_fields" => json_encode(['name', 'designation', 'detail', 'image']),
            ],
        ];
        CustomModule::insert($pages);
    }
}
