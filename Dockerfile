# ---------- Build stage ----------
FROM golang:1.25.5-alpine AS builder

WORKDIR /app

# Instala dependencias necesarias
RUN apk add --no-cache git

# Copiamos go.mod y go.sum primero (cache)
COPY go.mod go.sum ./
RUN go mod download

# Copiamos el resto del código
COPY . .

# Compilamos el binario
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -o api ./cmd/api

# ---------- Runtime stage ----------
FROM gcr.io/distroless/base-debian12

WORKDIR /app

# Copiamos el binario compilado
COPY --from=builder /app/api .

# Exponemos el puerto (Gin usa 8080 por defecto)
EXPOSE 8080

# Ejecutamos la API
CMD ["/app/api"]
