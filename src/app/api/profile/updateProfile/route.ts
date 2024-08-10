import { updateProfile } from '@/lib/actions';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
    try {
        // Parse JSON body
        const result = await request.json();

        // Log the parsed data to debug
        console.log("Resulting data:", result);

        // Call your updateProfile function with the parsed result
        console.log("fuck this shit", result.data)
        const formData = new FormData(result);
        const updateResult = await updateProfile(formData, result.cover_image, result.profile_image);

        // Return a response based on the result of the updateProfile function
        return NextResponse.json({ status: updateResult }, {
            status: updateResult.status === 'success' ? 200 : 400,
        });
    } catch (error) {
        // Log the error for debugging
        console.error('Error handling PATCH request:', error);

        // Return a JSON error response
        return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, {
            status: 500,
        });
    }
}
