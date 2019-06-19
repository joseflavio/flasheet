package servlets;

import java.io.IOException;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

@WebServlet("/services/HelloWorld")
public class HelloServlet extends HttpServlet {

    private static final long serialVersionUID = 816071945847920808L;

    public static class Columns {

        final public String[] columns;

        public Columns(final String[] names) {
            this.columns = names;
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM yyyy", Locale.US);
        YearMonth start = YearMonth.of(2019, 7);

        Columns columns = new Columns( new String[] { formatter.format(start) } );

        GsonBuilder builder = new GsonBuilder();
        builder.setPrettyPrinting();

        final var writer = response.getWriter();
        response.addHeader("content-type", "application/json");

        Gson gson = builder.create();
        gson.toJson(columns, writer);

    }

}
