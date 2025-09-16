<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::truncate();
        $this->call([
            CmsPageSeeder::class,
            CustomModuleSeeder::class,
            DepartmentSeeder::class,
        ]);
        User::create([
            'name' => 'Admin',
            'email' => 'cert-uk@gov.in',
            'password' => 'e86f78a8a3caf0b60d8e74e5942aa6d86dc150cd3c03338aef25b7d2d7e3acc7', // 'Admin@123'
        ]);
    }
}
