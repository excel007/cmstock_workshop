import React from 'react'

type Props = {
    params: { slug: string[] };
};

export default function User({ params }: Props) {
    return (
        <div>User
            <ul>
                {params.slug.map((v) => (
                    <li key={v}>User id = {v}</li>
                )
                )}
            </ul>

        </div>
    )
}