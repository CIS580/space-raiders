/**
 * Created by jozef on 7.12.2018.
 */
export default class MyMath {

    /**
     * Return distance from two 2D points
     *
     * @param v1 Vector
     * @param v2 Vector
     * @returns {number} Distance
     */
    static distance(v1,v2) {
        let dX = MyMath.dX(v1,v2);
        let dY = MyMath.dY(v1,v2);
        return  Math.sqrt(dX * dX + dY * dY);
    }

    static dX(v1,v2) {
        return v1.x - v2.x;
    }

    static dY(v1,v2) {
        return v1.y - v2.y;
    }

    /**
     * Returns random number in interval [min,max)
     *
     * @param min number
     * @param max number
     * @returns number
     */
    static randomBetween(min,max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Bounces object based on their velocity and mass
     *
     * @param object
     * @param other
     */
    static bounce(object, other) {
        var angle, cosine, dX, dY, sine, vTotal, vX, vXb, vY, vYb, x, xB, y, yB;
        dX = MyMath.dX(other.position,object.position);
        dY = MyMath.dY(other.position,object.position);
        if (MyMath.distance(object.position,other.position) < object.radius + other.radius) {
            angle = Math.atan2(dY, dX);
            sine = Math.sin(angle);
            cosine = Math.cos(angle);
            x = y = 0;
            xB = dX * cosine + dY * sine;
            yB = dY * cosine - dX * sine;
            vX = object.velocity.x * cosine + object.velocity.y * sine;
            vY = object.velocity.y * cosine - object.velocity.x * sine;
            vXb = other.velocity.x * cosine + other.velocity.y * sine;
            vYb = other.velocity.y * cosine - other.velocity.x * sine;
            xB = x + (object.radius + other.radius);
            vTotal = vX - vXb;
            vX = ((object.mass - other.mass) * vX + 2 * other.mass * vXb) / (object.mass + other.mass);
            vXb = vTotal + vX;
            object.position.x = object.position.x + (x * cosine - y * sine);
            object.position.y = object.position.y + (y * cosine + x * sine);
            other.position.x = object.position.x + (xB * cosine - yB * sine);
            other.position.y = object.position.y + (yB * cosine + xB * sine);
            object.velocity.x = vX * cosine - vY * sine;
            object.velocity.y = vY * cosine + vX * sine;
            other.velocity.x = vXb * cosine - vYb * sine;
            other.velocity.y = vYb * cosine + vXb * sine;
        }
    }
}