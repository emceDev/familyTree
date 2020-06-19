import React from 'react'

import { Button } from '@material-ui/core'

export const Options = props =>{
    return(
        <div className="Options">
            <Button size="small" variant="outlined"
            onClick={() => props.addRelative("/children/")}>AddChild
            </Button>

            <Button size="small" variant="outlined"
            onClick={() => props.addRelative("/partner/")}>AddPartner
            </Button>

            <Button size="small" variant="outlined"
            onClick={() => props.memEdit(true)}>EditMember
            </Button>
        </div>
    )
}