package auth

import (
    "time"
    "github.com/golang-jwt/jwt/v5"
)

var Secret = []byte("CyberShieldSecretKey")

func GenerateJWT(username string) (string, error) {

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "username": username,
        "exp": time.Now().Add(time.Hour * 24).Unix(),
    })

    return token.SignedString(Secret)
}