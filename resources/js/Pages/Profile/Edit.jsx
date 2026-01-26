import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout title={"Settings"}>
            <Head title="Settings" />

            <div className="py-5">
                <div className="sm:px-6 lg:px-8">
                    <div className='flex gap-5'>
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 flex-1">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 flex-1">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>
                    <div className="mt-5 bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
