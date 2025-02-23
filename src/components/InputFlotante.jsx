'use client';

export default function Button({ id, name, type, inputRef, onChange, defaultValue, value, required, label, shadow, disabled}) {

    function stopPropagation(e) {
        e.stopPropagation();
    }
    return (
        <div class="relative z-0 w-full  group ">
            <input
                type={type}
                name={name ? name : label}
                id={label}
                ref={inputRef}
                onChange={onChange}
                placeholder=""
                required={required}
                defaultValue={defaultValue}
                value={value && value}
                min={type == 'number' && "1"}
                disabled={disabled}
                class={`block ${shadow ? shadow : 'shadow-[#b6b6b6]'} bg-white   py-2.5  w-full text-[12px] text-gray-900 bg-transparent  px-5 border border-[#a1a1a1] appearance-none  focus:outline-none focus:ring-0  peer rounded-[5px]`} />
            <label for={label} class="  z-50  peer-focus:font-medium  absolute text-[12px] bg-white px-5 mx-2 text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{label}</label>
        </div>
    )
}