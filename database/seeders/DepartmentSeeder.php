<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\{CicoUser, Department, SubDepartment};
use Illuminate\Support\Facades\File;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $path = storage_path('app/Department.csv');

        // if (!File::exists($path)) {
        //     $this->command->error("CSV file not found at $path");
        //     return;
        // }
        // Department::truncate();

        // $data = array_map('str_getcsv', file($path));
        // $header = array_map('trim', $data[0]);
        // foreach (array_slice($data, 1) as $row) {
        //     $row = array_combine($header, $row);
        //     Department::Create(
        //         [
        //             'name' => $row['name'],
        //             'hindi_name'   => $row['hindi_name'] ?? null,
        //             'description'  => $row['description'] ?? null,
        //         ]
        //     );
        // }
        // // Sub Department seeding
        // $path = storage_path('app/sub_department.csv');

        // if (!File::exists($path)) {
        //     $this->command->error("CSV file not found at $path");
        //     return;
        // }
        // SubDepartment::truncate();
        // $data = array_map('str_getcsv', file($path));
        // $header = array_map('trim', $data[0]);
        // foreach (array_slice($data, 1) as $row) {
        //     $row = array_combine($header, $row);

        //     SubDepartment::Create(
        //         [
        //             'name' => $row['name'],
        //             'department_id' => isset($row['department_id']) ? (int)$row['department_id'] : null,
        //             'hindi_name'    => $row['hindi_name'] ?? null,
        //             'description'   => $row['description'] ?? null,
        //         ]
        //     );
        // }

        // // CISO Users seeding
        // $path = storage_path('app/Officer.csv');

        // CicoUser::truncate();
        // if (!File::exists($path)) {
        //     $this->command->error("CSV file not found at $path");
        //     return;
        // }

        // $data = array_map('str_getcsv', file($path));
        // $header = array_map('trim', $data[0]);
        // foreach (array_slice($data, 1) as $row) {
        //     $row = array_combine($header, $row);
        //     CicoUser::Create(
        //         // ['id' => $row['id']], // Search condition (must match unique column)
        //         [
        //             'department'   => $row['department'] ?? null,
        //             'organization'   => $row['organization'] ?? null,
        //             'first_name'   => $row['first_name'],
        //             'full_name'   => $row['first_name'] ?? null,
        //             'email'  => $row['email'] ?? null,
        //             'phone'  => $row['phone'] ?? null,
        //             'designation'  => $row['designation'] ?? null,
        //             'appointment_order'  => $row['appointment_order'] ?? null,
        //         ]
        //     );
        // }
        // $this->command->info('Departments, Sub Department and CISO Users are inserted/updated successfully!');
    }
}
