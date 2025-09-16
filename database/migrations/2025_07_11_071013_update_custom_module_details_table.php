<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::table('custom_module_details', function (Blueprint $table) {
            $table->string('email')->nullable()->unique();
            $table->string('phone')->nullable()->unique();
            $table->string('status')->nullable();
            $table->smallInteger('publish')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
