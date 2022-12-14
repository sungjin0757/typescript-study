interface ScatterProps {
    xs: number[];
    ys: number[];

    xRange: [number, number];
    yRange: [number, number];
    color: string;

    onClick: (x: number, y: number, index: number) => void;
    
}

function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
    let k: keyof ScatterProps;
    for (k in oldProps) {
        if (oldProps[k] !== newProps[k]) {
            if(k !== 'onClick')
                return true;
        }
    }
    return false;
}

function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
    return (
        oldProps.xs !== newProps.xs ||
        oldProps.ys !== newProps.ys ||
        oldProps.xRange !== newProps.xRange ||
        oldProps.yRange !== newProps.yRange ||
        oldProps.color !== newProps.color 
        // not check onclick
    )
}

const REQUIRES_UPDATE: {[k in keyof ScatterProps]: boolean} = {
    xs: true,
    ys: true,
    xRange: true,
    yRange: true,
    color: true,
    onClick: false
};

function shouldUpdate(oldProps: ScatterProps, newProps: ScatterProps) {
    let k : keyof ScatterProps;
    for (k in oldProps) {
        if(oldProps[k] !== newProps[k] && REQUIRES_UPDATE[k]) {
            return true;
        }
    }
    return false;
}