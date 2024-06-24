'use client';
import { useUser } from '@/context/Context'
import { useEffect, useState } from 'react'
import { onAuth, signInWithEmail, writeUserData, removeData, getSpecificData } from '@/firebase/utils'
import Image from 'next/image'
import Link from 'next/link'
import style from '@/app/page.module.css'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal'
import InputFlotante from '@/components/InputFlotante'

export default function Home() {
    const { user, introVideo, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, item, cliente, setCliente, cart, setCart, modal, setModal } = useUser()
    const router = useRouter()
    const [query, setQuery] = useState('')
    const [data, setData] = useState({})

    function handlerOnChange(e, key) {
        setData({ ...data, [key]: { ...data[key], [e.target.name]: e.target.value } })
    }
    function saveFrontPage(e, key) {
        e.preventDefault()
        if (data[key]) {
            setUserSuccess('Cargando')
            writeUserData(`Cliente/price${query}/${key}`, data[key], setUserSuccess)
        }
    }
    function saveFrontPage2(e, key) {
        e.preventDefault()
        if (data[key]) {
            setUserSuccess('Cargando')
            writeUserData(`Cliente/${query}/${key}`, data[key], setUserSuccess)
        }
    }
    function getDB() {
        getSpecificData('/Cliente', setCliente)

    }
    function deleteHandler(e, route,) {
        e.preventDefault()
        setUserSuccess('Cargando')
        removeData(route, setUserSuccess, getDB)
    }

    function close(e) {
        router.back()
    }
    function sortArray(x, y) {
        if (x[1]['ORIGEN'].toLowerCase() < y[1]['ORIGEN'].toLowerCase()) { return -1 }
        if (x[1]['ORIGEN'].toLowerCase() > y[1]['ORIGEN'].toLowerCase()) { return 1 }
        return 0
    }
    function sortArray3(x, y) {
        if (x[1]['MERCANCIA'].toLowerCase() < y[1]['MERCANCIA'].toLowerCase()) { return -1 }
        if (x[1]['MERCANCIA'].toLowerCase() > y[1]['MERCANCIA'].toLowerCase()) { return 1 }
        return 0
    }
    function sortArray4(x, y) {
        if (x[1]['termino'].toLowerCase() < y[1]['termino'].toLowerCase()) { return -1 }
        if (x[1]['termino'].toLowerCase() > y[1]['termino'].toLowerCase()) { return 1 }
        return 0
    }
    useEffect(() => {
        if (window && typeof window !== "undefined") {
            setQuery(window.location.href.split('=')[1])
        }
    }, [cliente, success])
    return (
        <div className="min-h-full">
            <img src="/airplane-bg.jpg" className='fixed  w-screen h-screen  object-cover  ' alt="" />

            <div className="fixed top-0 left-0 flex justify-center w-full h-auto bg-[#000000b4] p-0 z-40 " >
                <div className="relative w-[95%] h-screen overflow-y-scroll lg:w-[50%] bg-white border-b border-gray-900/10 pt-16 pb-16 lg:pb-4 px-5">
                    <Link href={`/Admin/Cotizador/Add?item=${query}`} className='fixed bottom-[100px] right-[100px]  rounded-full z-50 block font-medium '>
                        <div className="absolute top-5 left-5  p-1 border text-white border-white rounded-full h-[50px] w-[50px] text-center flex items-center justify-center bg-[#F1BA06]" >
                            ADD
                        </div>
                    </Link>
                    <div className="absolute w-[50px] top-5 right-5 text-white p-1 rounded-tl-lg rounded-br-lg text-center bg-red-600" onClick={close}>
                        X
                    </div>
                    {(query === 'FTL' || query === 'FCL') && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]"  >
                        {
                            cliente && cliente[`price${query}`] && Object.entries(cliente[`price${query}`]).sort(sortArray).map((i, index) => {
                                return <div className='relative p-5 my-5 mt-10 bg-white space-y-5 shadow-2xl border-b-[.5px] border-[#666666] '>
                                    <h5 className='text-center font-medium text-[16px]'>Editar {query}<br /> <span className='text-[#5c5c5c]'> {i[0]}</span></h5>
                                    < InputFlotante type="text" id={`floating_1`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['ORIGEN'] ? data[i[0]]['ORIGEN'] : i[1]['ORIGEN']} required label={'ORIGEN'} shadow='shadow-white' />
                                    < InputFlotante type="text" id={`floating_2`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['DESTINO'] ? data[i[0]]['DESTINO'] : i[1]['DESTINO']} required label={'DESTINO'} shadow='shadow-white' />
                                    < InputFlotante type="number" id={`floating_3`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['PESO (KG)'] ? data[i[0]]['PESO (KG)'] : i[1]['PESO (KG)']} required label={'PESO (KG)'} shadow='shadow-white' />
                                    < InputFlotante type="number" id={`floating_4`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['VOLUMEN M3'] ? data[i[0]]['VOLUMEN M3'] : i[1]['VOLUMEN M3']} required label={'VOLUMEN M3'} shadow='shadow-white' />
                                    < InputFlotante type="text" id={`floating_5`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['TIPO DE UNIDAD'] ? data[i[0]]['TIPO DE UNIDAD'] : i[1]['TIPO DE UNIDAD']} required label={'TIPO DE UNIDAD'} shadow='shadow-white' />
                                    < InputFlotante type="text" id={`floating_6`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['MERCANCIA'] ? data[i[0]]['MERCANCIA'] : i[1]['MERCANCIA']} required label={'MERCANCIA'} shadow='shadow-white' />
                                    < InputFlotante type="text" id={`floating_7`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['SERVICIO'] ? data[i[0]]['SERVICIO'] : i[1]['SERVICIO']} required label={'SERVICIO'} shadow='shadow-white' />
                                    < InputFlotante type="number" id={`floating_8`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['FLETE USD'] ? data[i[0]]['FLETE USD'] : i[1]['FLETE USD']} required label={'FLETE USD'} shadow='shadow-white' />
                                    < InputFlotante type="number" id={`floating_9`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['SERVICIOS LOGISTICOS USD'] ? data[i[0]]['SERVICIOS LOGISTICOS USD'] : i[1]['SERVICIOS LOGISTICOS USD']} required label={'SERVICIOS LOGISTICOS USD'} shadow='shadow-white' />
                                    <div className='w-full grid grid-cols-2 justify-items-center	'>
                                        <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/price${query}/${i[0]}`, i[0], setData)}>Eliminar</Button>
                                        <Button theme="Primary" click={(e) => { saveFrontPage(e, i[0]) }}>Guardar</Button>
                                    </div>

                                </div>
                            })
                        }
                    </form>}

                    {query === 'mercancias' && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]"  >
                        {
                            cliente && cliente[query] && Object.entries(cliente[query]).sort(sortArray3).map((i, index) => {
                                return <div className='relative p-5 my-5 mt-10 bg-white space-y-5 shadow-2xl border-b-[.5px] border-[#666666] '>
                                    <h5 className='text-center font-medium text-[16px]'>Editar {query}<br /> <span className='text-[#5c5c5c]'> {i[0]}</span></h5>
                                    < InputFlotante type="text" id={`floating_10`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['MERCANCIA'] ? data[i[0]]['MERCANCIA'] : i[1]['MERCANCIA']} required label={'MERCANCIA'} shadow='shadow-white' />
                                    < InputFlotante type="text" id={`floating_11`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['GA'] ? data[i[0]]['GA'] : i[1]['GA']} required label={'GA'} shadow='shadow-white' />
                                    < InputFlotante type="number" id={`floating_12`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['IVA'] ? data[i[0]]['IVA'] : i[1]['IVA']} required label={'IVA'} shadow='shadow-white' />
                                    <div className='w-full grid grid-cols-2 justify-items-center	'>
                                        <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/${query}/${i[0]}`, i[0], setData)}>Eliminar</Button>
                                        <Button theme="Primary" click={(e) => { saveFrontPage2(e, i[0]) }}>Guardar</Button>
                                    </div>

                                </div>
                            })
                        }
                    </form>}
                    {query === 'glosario' && <form className="relative  pt-5 sm:col-span-3 mb-5 pb-5 border-b-[.5px] border-[#666666]"  >
                        {
                            cliente && cliente[query] && Object.entries(cliente[query]).sort(sortArray4).map((i, index) => {
                                return <div className='relative p-5 my-5 mt-10 bg-white space-y-5 shadow-2xl border-b-[.5px] border-[#666666] ' key={`input-${index}`}>
                                    <h5 className='text-center font-medium text-[16px]'>Editar {query}<br /> <span className='text-[#5c5c5c]'> {i[0]}</span></h5>
                                    < InputFlotante type="text" id={`floating_13`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['termino'] ? data[i[0]]['termino'] : i[1]['termino']} required label={'termino'} shadow='shadow-white' />
                                    < InputFlotante type="text" id={`floating_14`} onChange={(e) => handlerOnChange(e, i[0])} value={data[i[0]] && data[i[0]]['significado'] ? data[i[0]]['significado'] : i[1]['significado']} required label={'significado'} shadow='shadow-white' />
                                    <div className='w-full grid grid-cols-2 justify-items-center	'>
                                        <Button type="button" theme="Danger" click={(e) => deleteHandler(e, `Cliente/${query}/${i[0]}`, i[0], setData)}>Eliminar</Button>
                                        <Button theme="Primary" click={(e) => { saveFrontPage2(e, i[0]) }}>Guardar</Button>
                                    </div>

                                </div>
                            })
                        }
                    </form>}
                </div>
            </div>
            {success === 'Cargando' && <Loader></Loader>}
        </div>
    )
}






