<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Step 01
composer install

# Step 02
npm install

# Step 03 / Add new table or column
php artisan migrate

# Step 04 / Run Seeder (We don't have that for now)
php artisan db:seed --class=PermissionSeeder
php artisan db:seed --class=UserSeeder

php artisan jwt:secret

# Step 05 / Create the missing folder
mkdir -p storage/framework/views

# Running project
php artisan serve
npm run dev

# If we got error "No application encryption key has been specified."
php artisan key:generate


# Delele Data All Table
php artisan migrate:fresh

# Delete Data One Table
php artisan migrate:refresh --path=""

# clear cache, route, config
php artisan cache:clear
php artisan config:clear
php artisan view:clear
php artisan route:clear
php artisan route:cache
php artisan config:cache

# Run the queue worker:
php artisan queue:work

# Create model layer
php artisan make:model YourModelName -mcr
# Create controller
php artisan make:controller ControllerName
