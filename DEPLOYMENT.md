# Deployment Guide for Render.com

This guide will help you deploy your Task Management API to Render.com.

## Prerequisites

1. **Supabase Database**: You need a Supabase PostgreSQL database set up
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Render.com Account**: Sign up at [render.com](https://render.com)

## Step 1: Database Setup (Supabase)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase dashboard, go to **Settings** → **Database**
3. Copy the **Connection String** (URI) - this will be your `DATABASE_URL`
4. Note: The connection string should look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
   ```

## Step 2: Deploy to Render.com

### 2.1 Create a New Web Service

1. Log into your Render.com dashboard
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your repository and branch (usually `main`)

### 2.2 Configure the Service

**Basic Settings:**
- **Name**: `task-management-api` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose the closest region to your users
- **Branch**: `main` (or your deployment branch)

**Build & Deploy Settings:**
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

### 2.3 Environment Variables

In the Render dashboard, go to **Environment** tab and add these variables:

```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=10000
NODE_ENV=production
```

**Important Notes:**
- Replace `[YOUR-PASSWORD]` and `[YOUR-PROJECT-REF]` with your actual Supabase credentials
- Use a strong, random JWT secret for production
- Render uses port 10000 by default, but the app will use the PORT environment variable

### 2.4 Database Migration

After your first deployment, you need to run the database migrations:

1. In your Render dashboard, go to your service
2. Click on **"Shell"** tab
3. Run these commands:
   ```bash
   npm run db:push
   ```

This will create the necessary tables in your Supabase database.

## Step 3: Post-Deployment Setup

### 3.1 Test Your Deployment

Your API will be available at: `https://your-app-name.onrender.com`

Test the endpoints:
```bash
# Health check
curl https://your-app-name.onrender.com/api/protected

# This should return a 401 (unauthorized) which is expected without a token
```

### 3.2 Environment Variables for Production

Make sure these environment variables are set in Render:

- `DATABASE_URL`: Your Supabase connection string
- `JWT_SECRET`: A secure random string (use a password generator)
- `PORT`: 10000 (Render's default)
- `NODE_ENV`: production

## Step 4: Custom Domain (Optional)

1. In your Render dashboard, go to **Settings**
2. Under **Custom Domains**, add your domain
3. Follow the DNS configuration instructions

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Verify your `DATABASE_URL` is correct
   - Check if your Supabase project is active
   - Ensure the password in the connection string is correct

2. **Build Failed**
   - Check the build logs in Render dashboard
   - Ensure all dependencies are in `package.json`
   - Verify the build command is correct

3. **App Crashes on Start**
   - Check the runtime logs
   - Verify environment variables are set correctly
   - Ensure the start command is `npm start`

4. **Database Schema Not Created**
   - Run `npm run db:push` in the Render shell
   - Check if `DATABASE_URL` is accessible from Render

### Logs and Monitoring

- View logs in your Render dashboard under the **"Logs"** tab
- Monitor your service health in the **"Metrics"** tab
- Set up alerts for downtime in the **"Alerts"** section

## Security Considerations

1. **JWT Secret**: Use a strong, random secret key
2. **Database**: Keep your database credentials secure
3. **Environment Variables**: Never commit sensitive data to your repository
4. **CORS**: The current setup allows all origins - consider restricting in production

## Cost Optimization

- Render's free tier includes:
  - 750 hours/month of usage
  - Sleep after 15 minutes of inactivity
  - Limited to 512MB RAM

- Consider upgrading if you need:
  - Always-on service
  - More resources
  - Custom domains

## API Endpoints After Deployment

Your deployed API will have these endpoints:

```
https://your-app-name.onrender.com/api/auth/register
https://your-app-name.onrender.com/api/auth/login
https://your-app-name.onrender.com/api/auth/me
https://your-app-name.onrender.com/api/tasks
https://your-app-name.onrender.com/api/tasks/:id
https://your-app-name.onrender.com/api/tasks/:taskId/subtasks
https://your-app-name.onrender.com/api/subtasks/:id
```

## Next Steps

1. Update your frontend application to use the new API URL
2. Set up monitoring and alerts
3. Consider implementing rate limiting
4. Set up automated backups for your database
5. Implement proper logging for production debugging

## Support

- [Render Documentation](https://render.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
