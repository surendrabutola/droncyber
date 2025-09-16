import { useCaptcha } from '@/hooks/use-captcha';
import { Input } from '@headlessui/react';
import { forwardRef, useImperativeHandle } from 'react';

interface CaptchaProps {
    onChange: (value: string) => void;
    error?: string;
    config?: string;
}

export interface CaptchaHandle {
    reset: () => void;
}

const Captcha = forwardRef<CaptchaHandle, CaptchaProps>(({ onChange, error, config = 'default' }, ref) => {
    const { imageUrl, refresh } = useCaptcha(config);

    // Expose `reset()` method to parent via ref
    useImperativeHandle(ref, () => ({
        reset: () => {
            refresh();
        },
    }));

    return (
        <>
            <div className="flex items-center gap-2 md:gap-5">
                <Input
                    type="text"
                    name="captcha"
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="CAPTCHA"
                    className="h-10 w-30 rounded-lg border border-gray-300  px-4 py-1 focus:ring-1 focus:ring-gray-300 focus:outline-none lg:w-40"
                    required
                />
                <div className="flex gap-2">
                    {imageUrl && <img src={imageUrl || ''} alt="CAPTCHA" className="h-10 w-fit rounded border" />}
                    <button type="button" onClick={refresh} className="text-xl font-bold text-blue-500 hover:cursor-pointer hover:text-blue-700">
                        ↻
                    </button>
                </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
        </>
    );
});

export default Captcha;
